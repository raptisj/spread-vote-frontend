import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioButtonGroup,
  useToast
} from "@chakra-ui/core";



const Toasts = ({hasErrors}) => {
  const [err, setErr] = useState(hasErrors)
  const toast = useToast();

    console.log(hasErrors)

  // const successToast = () => 

  useEffect(() => {
    hasErrors && toast({
      title: "Warning.",
      description: "This is a warning.",
      status: "warning",
      duration: 9000,
      isClosable: true,
    })

    !hasErrors && toast({
      title: "Warning.",
      description: "This is a warning.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    setErr(false)
  },[hasErrors, toast, err])


  return toast
}

export default Toasts