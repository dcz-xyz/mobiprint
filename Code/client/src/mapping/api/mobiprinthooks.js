
import { useQuery , useMutation, useQueryClient } from "react-query";
import { addPrintCommand, addPrintFile, fetchPrintFiles, startPrint} from "./mobiprintclient";


var QueryKeys; 

(function (QueryKeys) {
    QueryKeys["PrintFiles"] = "printFiles";
    QueryKeys["StartPrint"] = "startPrint";
})(QueryKeys || (QueryKeys = {}));

export const usePrintFilesQuery = () => {
    return useQuery(QueryKeys.PrintFiles, fetchPrintFiles);
}

export const useAddPrintFileMutation = () => {
    // console.log("useAddPrintFileMutation");                 
    const queryClient = useQueryClient();
    return useMutation(addPrintFile);
}

export const useAddPrintCommandMutation = () => {
    // console.log("useAddPrintCommandMutation");                 
    const queryClient = useQueryClient();
    return useMutation(addPrintCommand);
}


///// DUET 3D PRINTER HOOKS //////

export const useStartPrintQuery = (printFile) => {
    console.log("Starting Print: ", printFile);
    return useQuery(QueryKeys.StartPrint, startPrint(printFile));
}
