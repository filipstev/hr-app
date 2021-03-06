import axiosInstance from '../../helpers/axiosInstance';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import DeleteProfile from './DeleteProfile';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ShowProfiles = ({ status, profiles }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const deleteImage = useMutation((imgId) => {
        return axiosInstance.delete(`/upload/files/${imgId}`);
    });
    const deleteUser = useMutation((userId) => {
        return axiosInstance.delete(`/users/${userId}`);
    });
    const deleteAnswers = useMutation((answerId) => {
        return axiosInstance.delete(`/answers/${answerId}`);
    });
    const deleteProfile = useMutation((profileId) => {
        return axiosInstance.delete(`/profiles/${profileId}`);
    });
    const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const handleFormatDate = (date) => {
        const day = date.getDate();
        const monthInLetters = month[date.getMonth()];
        const year = date.getFullYear();

        const fullDate = `${day}/${monthInLetters}/${year}`;
        return `Joined: ${fullDate}`;
    };

    return !profiles
        ? null
        : profiles.data.map(({ id, attributes }) => {
              return (
                  <Grid item key={id}>
                      <Card sx={{ width: 300 }}>
                          <CardContent>
                              {!attributes.profilePhoto.data ? (
                                  <Typography
                                      variant="p"
                                      component="div"
                                      sx={{
                                          width: '200px',
                                          height: '200px',
                                          margin: '0 auto',
                                          lineHeight: '200px',
                                          textAlign: 'center',
                                      }}
                                  >
                                      Image Goes Here
                                  </Typography>
                              ) : (
                                  <div
                                      style={{
                                          width: '200px',
                                          height: '200px',
                                          margin: '0 auto',
                                      }}
                                  >
                                      <img
                                          style={{
                                              width: '100%',
                                              height: '100%',
                                          }}
                                          src={
                                              attributes.profilePhoto.data
                                                  .attributes.url
                                          }
                                          alt="profiles"
                                      />
                                  </div>
                              )}

                              <Typography
                                  sx={{ mb: 1.5, mt: 1.5 }}
                                  color="text.secondary"
                              >
                                  Status: {attributes.status}
                              </Typography>
                              <Typography
                                  variant="p"
                                  component="div"
                                  sx={{ textTransform: 'capitalize' }}
                              >
                                  Name: {attributes.name}
                              </Typography>
                              <Typography variant="body2">
                                  {handleFormatDate(
                                      new Date(attributes.createdAt)
                                  )}
                              </Typography>
                          </CardContent>
                          <CardActions
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                              }}
                          >
                              <Button
                                  size="small"
                                  endIcon={
                                      status === 'published' ? (
                                          <EditIcon />
                                      ) : (
                                          <InfoIcon />
                                      )
                                  }
                                  onClick={() => {
                                      if (status === 'pending') {
                                          navigate(`/team/pending/${id}/edit`);
                                      }
                                      if (status === 'published') {
                                          navigate(`/team/${id}/edit`);
                                      }
                                  }}
                              >
                                  {status === 'published' ? 'EDIT' : 'DETAILS'}
                              </Button>
                              <Button
                                  endIcon={<DeleteIcon />}
                                  size="small"
                                  onClick={(e) => {
                                      DeleteProfile({
                                          profiles,
                                          id,
                                          deleteProfile,
                                          deleteUser,
                                          deleteAnswers,
                                          deleteImage,
                                          queryClient,
                                      });
                                  }}
                              >
                                  DELETE
                              </Button>
                          </CardActions>
                      </Card>
                  </Grid>
              );
          });
};

export default ShowProfiles;
