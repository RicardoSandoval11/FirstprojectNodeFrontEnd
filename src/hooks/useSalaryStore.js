import { useDispatch } from "react-redux"
import { appApi } from "../api/appApi"
import { onLoadAllSalaries, onLoadSalariesFailed } from "../store/salaries/salariesSlice"


export const useSalaryStore = () => {

    const dispatch = useDispatch();

    const startLoadingAllSalaries = async() => {

        try {
            const { data } = await appApi.get('/api/salaries/get-all-salaries');

            dispatch(onLoadAllSalaries(data.salaries));

        } catch (error) {
            dispatch(onLoadSalariesFailed());
        }

    }

    return {
        startLoadingAllSalaries
    }
}