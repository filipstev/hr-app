import TeamHeader from './TeamHeader';
import BasicInfo from './EditBasicInfo';
import ShowAnswers from './ShowAnswers';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import Spinner from '../../Spinner.js/Spinner';
import { useCompany } from '../../../queryFunctions/fetchCompany';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';

const EditProfile = ({ edit }) => {
    const userId = useSelector((state) => state.user.user.user.id);

    const { id } = useParams();
    // Get profile
    const {
        data: profileData,
        refetch,
        isSuccess: profileIsSuccess,
    } = useGetProfile(id);
    const { data: company } = useCompany(userId);
    // Get answers

    const {
        data: answers,
        isLoading: answersIsLoading,
        isSuccess: answersIsSuccess,
    } = useGetAnswersOfProfile(id);
    // Get questions

    const {
        data: questions,
        isLoading: questionsIsLoading,
        isSuccess: questionsIsSuccess,
    } = useGetQuestions(company.name);
    console.log(answersIsSuccess, profileIsSuccess, questionsIsSuccess);
    if (!answersIsSuccess || !profileIsSuccess || !questionsIsSuccess) {
        return <Spinner />;
    }
    return (
        <>
            <Container sx={{ marginTop: '150px', padding: '0 40px 0 40px' }}>
                <>
                    <TeamHeader
                        edit={edit}
                        id={id}
                        data={profileData}
                        refetch={refetch}
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        rowGap={2}
                    >
                        <BasicInfo profile={profileData} />
                        <ShowAnswers
                            id={id}
                            answers={answers}
                            answersIsLoading={answersIsLoading}
                            questions={questions}
                            questionsIsLoading={questionsIsLoading}
                        />
                    </Grid>
                </>
            </Container>
        </>
    );
};

export default EditProfile;
