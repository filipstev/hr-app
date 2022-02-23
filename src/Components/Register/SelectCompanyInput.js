import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const SelectCompany = ({ companies, company, setCompany, setCompanyId }) => {
    return (
        <>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '97%',
                }}
            >
                <InputLabel id="selectCompany">Company</InputLabel>
                <Select
                    sx={{ paddingLeft: '16px', width: '100%' }}
                    labelId="selectCompany"
                    id="selectCompany"
                    label="Company"
                    value={company}
                    onChange={(e) => {
                        setCompany(e.target.value);
                        setCompanyId(
                            companies.filter(
                                (company) =>
                                    company.attributes.slug === e.target.value
                            )[0].id
                        );
                    }}
                >
                    {companies.map((item) => {
                        return (
                            <MenuItem
                                value={item.attributes.slug}
                                key={item.id}
                            >
                                {item.attributes.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectCompany;
