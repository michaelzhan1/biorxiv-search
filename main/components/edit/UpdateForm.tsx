'use client'


import { useState } from 'react'
import { CategoryOption, UpdateUserResponse } from '@/types/frontend'
import { MultiValue } from 'react-select'
import Select from 'react-select'
import DeleteButton from '@/components/edit/DeleteButton'


function titleCase (s: string): string {
  return s.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ')
}


export default function UpdateForm ({ email, search, defaultCategories, id }: { email: string, search: string, defaultCategories: string, id: string }): JSX.Element {
  const defaultCategoryOptions: CategoryOption[] = defaultCategories ? defaultCategories.split(';').map((category: string) => {
    return { value: category.toLowerCase(), label: titleCase(category) }
  }) : []

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
      <div className='flex flex-col h-screen justify-center items-center bg-gray-200'>
        <div className="w-full max-w-sm">
          <form onSubmit={ handleSubmit } className='bg-white rounded-md p-5 shadow-md'>
            <h1 className='text-center text-xl font-bold text-gray-700 mb-4'>Preferences for {email}</h1>
            <div className='mb-3'>
              <label htmlFor="query" className='block font-bold text-sm text-gray-700 mb-2'>Search</label>
              <input type="text" placeholder="Search" name="search" defaultValue={search} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="category" className='block font-bold text-sm text-gray-700 mb-2'>Categories</label>
              <Select options={options} isMulti className='basic-multi-select' classNamePrefix='select' onChange={handleSelectChange} defaultValue={defaultCategoryOptions}/>
            </div>
            <div className='flex justify-center mb-3'>
              <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 font-bold'>Update Search</button>
            </div>
            <hr className='h-px bg-gray-200 mb-3'/>
            <div className='flex justify-center'>
              <DeleteButton id={ id } />
            </div>
          </form>
        </div>
      </div>
    </>
  )
};