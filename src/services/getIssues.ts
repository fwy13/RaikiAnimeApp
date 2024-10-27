import { useQuery } from "@tanstack/react-query"
import getIssues from "../logic/getIssues";


const Issues = () => {
    return useQuery({
        queryKey: ["getIssues"],
        queryFn: async () => {
            return await getIssues();
        }
    })
}
export default Issues;