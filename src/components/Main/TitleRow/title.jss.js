import { makeStyles } from "@material-ui/core/styles";

export const useToolTipStyle = makeStyles((theme) => ({
     
    arrow:{
         color: theme.palette.common.black,
    },
    tooltip: {
         backgroundColor: theme.palette.common.black,
    }
}));