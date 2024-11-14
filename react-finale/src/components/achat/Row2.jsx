import { Box, Paper } from '@mui/material'
import SiteStatics from '../achat/siteStatics/SiteStatics'
import UserStatics from '../achat/staticsUser/UserStatics'
import { useNavigate } from 'react-router-dom'
import StatisticsDemande from '../achat/demandeStatistics/StatisticsDemande'

// 2 eme section utiliser dans la page d acceuiil qui fait reference a autre page deja pret pour afficher les statistics
const Row2 = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Paper sx={{ width: '32%', m: '10px', mt: '20px', p: '10px' }}>
                <div onClick={() => { navigate('/userStatics') }}>
                    <UserStatics />
                </div>
            </Paper>
            <Paper sx={{ width: '32%', m: '10px', mt: '20px',mr: '20px', p: '10px' }}>
                <div onClick={() => { navigate('/siteStatics') }}>
                    <SiteStatics />
                </div>
            </Paper>
            <Paper sx={{ width: '32%', m: '10px', mt: '20px',mr: '20px', p: '10px' }}>
                <div onClick={() => { navigate('/siteStatics') }}>
                    <StatisticsDemande />
                </div>
            </Paper>
        </Box>
    )
}

export default Row2
