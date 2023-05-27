import { useDispatch } from "react-redux";
import { appApi } from "../api/appApi";
import { onLoadStatus, onLoadStatusFailed } from "../store/status/statusSlice";


export const useStatusStore = () => {

    const dispatch = useDispatch();

    const startLoadingAllStatus = async() => {

        try {
            
            const { data } = await appApi.get('/api/status/get-all-status');

            dispatch(onLoadStatus(data.status));

        } catch (error) {
            
            dispatch(onLoadStatusFailed());

        }
    }

    return {
        startLoadingAllStatus
    }
}