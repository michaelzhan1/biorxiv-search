'use client'


import { useState } from 'react'
import Select from 'react-select'
import { MultiValue } from 'react-select'
import { CategoryOption, NewUserResponse } from '@/types/frontend'



export default function NewFilter () {
  const [categories, setCategories] = useState<string[]>([])

  const allCategories: string[] = [
    'Animal Behavior and Cognition',
    'Biochemistry',
    'Bioengineering',
    'Bioinformatics',
    'Biophysics',
    'Cancer Biology',
    'Cell Biology',
    'Clinical Trials',
    'Developmental Biology',
    'Ecology',
    'Epidemiology',
    'Evolutionary Biology',
    'Genetics',
    'Genomics',
    'Immunology',
    'Microbiology',
    'Molecular Biology',
    'Neuroscience',
    'Paleontology',
    'Pathology',
    'Pharmacology and Toxicology',
    'Physiology',
    'Plant Biology',
    'Scientific Communication and Education',
    'Synthetic Biology',
    'Systems Biology',
    'Zoology',
  ]

  const options: CategoryOption[] = allCategories.map((category: string) => {
    return { value: category.toLowerCase(), label: category }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res: Response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: (event.currentTarget as HTMLFormElement).email.value,
        search: (event.currentTarget as HTMLFormElement).search.value,
        categories: categories
      })
    })
    const data: NewUserResponse = await res.json()
    if (data.error) {
      console.error(data.error)
      alert(data.error)
    } else {
      console.log(data.message)
      alert(data.message)
    }
  }

  const handleSelectChange = (selected: MultiValue<CategoryOption> ): void => {
    setCategories(selected.map((category: CategoryOption) => category.value))
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" name="email" />
        <label htmlFor="search">Search</label>
        <input type="text" placeholder="Search" name="search" />
        <label htmlFor="category">Categories</label>
        <Select options={options} isMulti className='basic-multi-select' classNamePrefix='select' onChange={ handleSelectChange } />
        <button type="submit">Set Filter</button>
      </form>
    </>
  )
}