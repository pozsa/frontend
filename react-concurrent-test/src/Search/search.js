import {Box, Button, Card} from 'rebass/styled-components'
import {Input, Label, Radio} from '@rebass/forms'
import {useForm} from 'react-hook-form'
import React, {useState} from 'react'
import {baseQuery, mockTechniques} from './helpers'

const Search = ({setQueryObject}) => {
  const [fields, setFields] = useState({})
  const {register, handleSubmit} = useForm()

  const submitForm = data => {
    setFields(data)

    const query = baseQuery
    //garbage...
    data.title && (query.where = {title: {ilike: data.title}})
    data.technique && (query.where = {keywords: {inq: [data.technique]}})

    setQueryObject(query)
  }

  const resetForm = () => {
    setFields({})
    setQueryObject(baseQuery)
  }

  const SearchTitles = () => (
    <Box my={2}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        ref={register}
        defaultValue={fields.title}
      />
    </Box>
  )

  const SearchTechniques = () => (
    <Box my={2}>
      <Label htmlFor="technique">Techniques</Label>
      {mockTechniques.map(technique => (
        <Label key={technique} p={1}>
          <Radio
            id={technique}
            name="technique"
            value={technique}
            ref={register}
            defaultChecked={fields.technique === technique}
          />
          {technique}
        </Label>
      ))}
    </Box>
  )
  return (
    <Card as="form" onSubmit={handleSubmit(submitForm)}>
      <SearchTitles />
      <SearchTechniques />
      <Button type="submit" mx={4}>
        Search
      </Button>
      <Button type="reset" onClick={() => resetForm()}>
        Reset
      </Button>
    </Card>
  )
}

export default Search
