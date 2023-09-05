'use client'


import { useState } from 'react'
import Select from 'react-select'
import { MultiValue } from 'react-select'
import { CategoryOption, NewUserResponse } from '@/types/frontend'


const emailRegex = new RegExp('^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');


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
    if (!emailRegex.test((event.currentTarget as HTMLFormElement).email.value)) {
      alert('Please enter a valid email address')
      return
    }

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
      <div className='flex flex-col h-screen justify-center items-center bg-gray-200'>
        <div className="w-full max-w-sm">
          <form onSubmit={ handleSubmit } className='bg-white rounded-md p-5 shadow-md'>
            <h1 className='text-center text-xl font-bold text-gray-700 mb-4'>Set a bioRxiv search filter</h1>
            <div className='mb-3'>
              <label htmlFor="email" className='block font-bold text-sm text-gray-700 mb-2'>Email</label>
              <input type="text" placeholder="Email" name="email"  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-3'>
              <label htmlFor="search" className='block font-bold text-sm text-gray-700 mb-2'>Search Keywords</label>
              <input type="text" placeholder="Search" name="search" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="category" className='block font-bold text-sm text-gray-700 mb-2'>Categories</label>
              <Select options={options} isMulti className='basic-multi-select' classNamePrefix='select' onChange={ handleSelectChange } />
            </div>
            <div className='flex justify-center'>
              <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 font-bold'>Set Filter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}