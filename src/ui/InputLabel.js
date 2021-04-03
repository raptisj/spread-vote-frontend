import React from 'react';
import { FormLabel } from "@chakra-ui/react"

const InputLabel = ({ label, htmlFor = null, weight = 600 }) => <FormLabel htmlFor={htmlFor} fontWeight={weight}>{label}</FormLabel>

export default InputLabel