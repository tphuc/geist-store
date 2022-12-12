import { gray } from "@radix-ui/colors";
import { styled } from "@stitches/react";
import { useRef } from "react";


const Select = styled('select', {
    '-webkit-appearance': 'none',
    appearance: 'none',
    padding: '0 5px',
    fontSize: 15,
    fontWeight: 300,
    height: 30,
    display:"flex",
    alignItems:"center",
    background: gray.gray4,
    color: gray.gray10,
    border:"1px solid #333",
    borderRadius:4,
    fontFamily:"'Be Vietnam Pro', sans-serif",
    outlineStyle:"none",
    transition:'0.4s ease all',
    '&:hover': {
        transition:'0.4s ease all',
        backgroundImage:"linear-gradient(0deg, $gray6, $gray6)",
    },
    "&[data-chosen]:not([data-chosen=''])":{
        color: gray.gray12
    },

})


export const NativeSelect = ({children, onChange = (value) => {}, ...props}) => {
    const selectRef = useRef()
    return <Select ref={selectRef} onChange={(e) => {
        selectRef.current.dataset.chosen = selectRef.current.value 
        onChange(selectRef.current.value)
    }} {...props}>
        {children}
    </Select>
}