import { useState, useEffect } from "react";


const restrictionMap ={
    numbers: /[0-9]/g,
    specialcharacters: /[^a-zA-Z0-9]/ig,
    letters:/[a-z]/gi,
    address:/[^A-Za-z0-9 ]/gi
}

const structureMap = {
    address:/^\d+\s[A-z]+\s[A-z]+/,
    email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}




export const useForm = initialValues => {

  const [formItems, setFormItems] = useState(initialValues);

  const handleChange = e => {

      const { name , value} = e.target;

      const currentFormItem = formItems[name];

      const { restictions:{ restrict = [], maxSize } } = currentFormItem;
   
      const restrictedCharacter = restrict.find(restriction => {
          return value.match(restrictionMap[restriction]);
      })

      const isTooLarge =  maxSize=== -1? false : value.length > maxSize ;
        
      if(restrictedCharacter || isTooLarge)return;

      setFormItems({
          ...formItems,
          [name]:{
              ...currentFormItem,
              value,
              invalid:false
          }
      });
  };

  const handleBlur = e => {
    const { name , value} = e.target;

    const currentFormItem = formItems[name];

    const { restictions:{minSize, structure  }} = currentFormItem;

    const matchesStructure = structure? structureMap[structure].test(value): true;
    
    if(value === '' || value.length < minSize || !matchesStructure){
        setFormItems({
            ...formItems,
            [name]:{
                ...currentFormItem,
                invalid:true
            }
        });
    } else {

        setFormItems({
            ...formItems,
            [name]:{
                ...currentFormItem,
                invalid:false
            }
        });
    }
  }
  const resetItems = () => {

    let temp = JSON.parse(JSON.stringify(formItems));

    Object.keys(formItems).forEach(key => {
            temp[key] = {
                ...temp[key],
                value:'',
                invalid:false
            }
    });

    setFormItems(temp);
  }

  const getValidation = ()=>{
      return Object.keys(formItems).find(key => formItems[key].invalid === true);
  }

  return [
    formItems,
    handleChange,
    handleBlur,
    getValidation,
    resetItems
  ];
};