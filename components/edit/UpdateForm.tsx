'use client'


import { useState } from 'react'
import { CategoryOption, UpdateUserResponse } from '@/types/frontend'
import { MultiValue } from 'react-select'
import Select from 'react-select'


function titleCase (s: string): string {
  return s.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ')
}


export default function UpdateForm ({ email, search, defaultCategories }: { email: string, search: string, defaultCategories: string }): JSX.Element {
  const defaultCategoryOptions: CategoryOption[] = defaultCategories.split(';').map((category: string) => {
    return { value: category.toLowerCase(), label: titleCase(category) }
  })

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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        search: (event.currentTarget as HTMLFormElement).search.value,
        categories: categories
      })
    })
    const data: UpdateUserResponse = await res.json()
    if (data.error) {
      console.log(data.error)
      alert(data.error)
    } else {
      console.log(`User ${email} updated`)
      alert(`User ${email} updated`)
    }
  }


  const handleSelectChange = (selected: MultiValue<CategoryOption> ) => {
    setCategories(selected.map((category: CategoryOption) => category.value))
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="query">Search</label>
        <input type="text" placeholder="Search" name="search" defaultValue={search}/>
        <label htmlFor="category">Categories</label>
        <Select options={options} isMulti className='basic-multi-select' classNamePrefix='select' onChange={handleSelectChange} defaultValue={defaultCategoryOptions}/>
        <button type="submit">Set Filter</button>
      </form>
    </>
  )
};