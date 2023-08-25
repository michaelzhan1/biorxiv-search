'use client'


import { useState } from 'react'
import { CategoryOption } from '@/types/biorxiv'
import { MultiValue } from 'react-select'
import Select from 'react-select'


type FilterResponse = {
  error: string | null,
  message: string | null
}


export default function UpdateForm ({ email }: { email: string }): JSX.Element {
  const [articles, setArticles] = useState<any[]>([])
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
    const res: Response = await fetch('/api/editFilter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        search: (event.currentTarget as HTMLFormElement).query.value,
        categories: categories
      })
    })
    const data: FilterResponse = await res.json()
    if (data.error) {
      console.log(data.error)
      alert(data.error)
    } else {
      console.log(data.message)
      alert(data.message)
    }
  }

  const handleSelectChange = (selected: MultiValue<CategoryOption> ) => {
    setCategories(selected.map((category: CategoryOption) => category.value))
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="query">Search</label>
        <input type="text" placeholder="Search" name="query" />
        <label htmlFor="category">Categories</label>
        <Select options={options} isMulti className='basic-multi-select' classNamePrefix='select' onChange={handleSelectChange} />
        <button type="submit">Set Filter</button>
      </form>
    </>
  )
};