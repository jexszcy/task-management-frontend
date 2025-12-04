import { memo, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { toastSuccess, toastWarning } from './../../ToastNotif';
import axiosRequest from "./../../../utils/axios-request";

const CheckboxComponent = memo(function CheckboxComponent({initValue, id}) {
    const [value, setValue] = useState(initValue);
    return (
        <Checkbox
            className="cursor-pointer mt-1"
            checked={value}
            onCheckedChange={async (checked) => {
                const oldValue = value;
                setValue(!value)
                try{
                    const response = await axiosRequest.patch(`tasks/${id}/complete`, {
                        is_complete: checked
                    });
                    
                    toastSuccess(response.data.message)
                }catch(err){
                    setValue(oldValue)
                    toastWarning(err.response.data.message)
                }
            }}
        />

    )
})

export default CheckboxComponent
