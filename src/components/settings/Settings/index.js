import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authSelector, currentUser } from "redux/slices/auth";
import { getSingleGuest, updateUserGuest, guestsSelector } from "redux/slices/guests";
import { Box, Button, Grid, Input, Text, Switch, FormControl, FormLabel, Textarea, HStack, TagLeftIcon, TagLabel, Tag } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import styled from "@emotion/styled";
import Layout from "screens/Layout";
import Header from "ui/Header";
import CustomButton from 'ui/Button';
import GlobalSpinner from "ui/GlobalSpinner";
import Label from 'ui/InputLabel';

const SideNote = styled.span`
  color: rgb(113, 128, 150);
  font-size: 14px;
  margin-top: 8px;
`

const Settings = () => {
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState('')
  const [inputBio, setInputBio] = useState('')
  const [tags, setTags] = useState([])
  const [currentValue, setCurrentValue] = useState('')
  const [profileChecked, setProfileChecked] = useState(false)
  const { user, userId, loading } = useSelector(authSelector)
  const { singleGuest, loading: guestLoading } = useSelector(guestsSelector)
  const { bio, social, userId: user_id, _id: guestId } = singleGuest ?? {}
  const [inputSocial, setInputSocial] = useState({ ...social })

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getSingleGuest(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setInputSocial({ ...social })
  }, [social])

  const handleKeyDown = (e) => {
    if (e.which === 32) return false;

    if (e.which === 13 && currentValue !== '') {
      setTags([...tags, currentValue])
      setCurrentValue('')
    }
  }

  const handleBlur = () => {
    if (currentValue !== '') {
      setTags([...tags, currentValue])
      setCurrentValue('')
    }
  }

  const removeTag = (tag) => {
    tags.splice(tag, 1)
    setTags([...tags])
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();


    const data = {
      name: inputName,
      bio: inputBio,
      social: inputSocial,
      userId: user_id,
      _id: guestId,
    }

    // if (inputName !== user.name && inputName !== "") {
    //   data.name = inputName
    // }

    // if (inputBio !== bio && inputBio !== "") {
    //   data.bio = inputBio
    // }

    // if (social.website !== inputSocial.website || social.twitter !== inputSocial.twitter) {
    //   data.social = inputSocial
    // }

    dispatch(updateUserGuest(data))
  }

  const handleSocial = (e) => {
    const { name, value } = e.target

    setInputSocial({ ...inputSocial, [name]: value })
  }


  const handleProfile = ({ target }) => {
    setProfileChecked(target.checked)
  }

  const handleProfileForm = (e) => {
    e.preventDefault();
    console.log(tags, profileChecked)
  }

  if (loading || guestLoading || user === null || !singleGuest) return <GlobalSpinner />;

  return (
    <Layout>
      <Box maxW="660px" mx="auto">

        <Header heading="General Settings" />

        <hr />

        <SideNote>All changes will apply to your profile page to.</SideNote>

        <Grid mt={12} mb={10} gridGap={12}>

          <FormControl as="form" display="grid" gridGap={12} onSubmit={handleProfileUpdate}>
            <Box>
              <Label htmlFor="name" label="Name" />
              <Input placeholder="Add name"
                focusBorderColor="#19c39c"
                bg="#f6f8f9"
                id="name"
                value={inputName || user.name}
                onChange={e => setInputName(e.target.value)} />

              {user.name !== inputName && inputName !== "" && (
                <Button colorScheme="teal" variant="link" ml={1} mt={1} onClick={() => setInputName(user.name)}>
                  Cancel
                </Button>
              )}
            </Box>

            <Box>
              <Label htmlFor="bio" label="Bio" />
              <Textarea
                resize="none"
                id="bio"
                placeholder="I'm X and I do Y"
                focusBorderColor="#19c39c"
                bg="#f6f8f9"
                value={inputBio || bio}
                onChange={e => setInputBio(e.target.value)} />

              {bio !== inputBio && inputBio !== "" && (
                <Button colorScheme="teal" variant="link" ml={1} mt={1} onClick={() => setInputBio(bio)}>
                  Cancel
                </Button>
              )}
            </Box>

            <Box>
              <Label label="Links" />
              <Input
                placeholder={social.website || 'Add website url'}
                id="website"
                name="website"
                focusBorderColor="#19c39c"
                bg="#f6f8f9"
                value={inputSocial.website}
                onChange={handleSocial}
                onPaste={handleSocial}
              />

              {social.website !== inputSocial.website && social.website !== "" && (
                <Button colorScheme="teal" variant="link" ml={1} mt={1} onClick={() => setInputSocial({ ...inputSocial, website: social.website })}>
                  Cancel
                </Button>
              )}

              <Input
                placeholder={social.twitter || "Add twitter url"}
                id="twitter"
                name="twitter"
                mt={6}
                focusBorderColor="#19c39c"
                bg="#f6f8f9"
                value={inputSocial.twitter}
                onChange={handleSocial}
                onPaste={handleSocial}
              />

              {social.twitter !== inputSocial.twitter && social.twitter !== "" && (
                <Button colorScheme="teal" variant="link" ml={1} mt={1} onClick={() => setInputSocial({ ...inputSocial, twitter: social.twitter })}>
                  Cancel
                </Button>
              )}
            </Box> 
            
            <CustomButton margin="1rem 0 0 0" appearance="primary" type="submit">Save Changes</CustomButton>
          </FormControl>

          <hr style={{ margin: '1rem 0' }} />

          <FormControl as="form" display="grid" gridGap={12} onSubmit={handleProfileForm}>
            <Box>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Make my profile visible
              </FormLabel>
                <Switch id="email-alerts" colorScheme="green" onChange={handleProfile} />
              </FormControl>
              <SideNote>This way you make yourself discoverable to podcasts. They find you by tag.</SideNote>
            </Box>

            {profileChecked && (
              <Box>
                <Label label="Tags" />
                <Input
                  placeholder="Add tags"
                  id="add-tags"
                  focusBorderColor="#19c39c" bg="#f6f8f9"
                  onChange={e => setCurrentValue(e.target.value.replace(/\s/g, ''))}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  value={currentValue}
                  disabled={tags.length === 3 || !profileChecked}
                />
                <SideNote>Podcasts hosts can find you based on tags.</SideNote>

                <HStack spacing={2} mt={3}>
                  {tags.map((tag, i) => (
                    <Tag size="md" key={tag} variant="subtle" colorScheme="cyan">
                      <TagLeftIcon boxSize="12px" as={AddIcon} onClick={() => removeTag(i)} cursor="pointer" />
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )}

            {profileChecked && <CustomButton margin="1rem 0 0 0" appearance="primary" type="submit">Save Changes</CustomButton>}
          </FormControl>

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Text fontWeight="600">Set up my Podcast page</Text>
            <CustomButton appearance="primary">TypeForm</CustomButton>
          </Box>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Settings