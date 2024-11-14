import { Box, Paper } from '@mui/material'
import SiteStatics from '../directeurSite/siteStatics/SiteStatics'
import UserStatics from '../directeurSite/staticsUser/UserStatics'
import { useNavigate } from 'react-router-dom'

// 2 eme section utiliser dans la page d acceuiil qui fait reference a autre page deja pret pour afficher les statistics
const Row2 = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Paper sx={{ width: '60%',m: '10px', mt: '20px', p: '10px' }}>
                <div onClick={() => { navigate('/userStatics') }}>
                    <UserStatics />
                </div>
            </Paper>
            <Paper sx={{ width: '35%', m: '10px', mt: '20px',mr: '20px', p: '10px' }}>
                <div  onClick={() => { navigate('/siteStatics') }}>
                    <SiteStatics />
                </div>
            </Paper>
        </Box>
    )
}

export default Row2
