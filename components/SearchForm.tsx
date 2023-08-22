'use client'


import { FC } from 'react'
import Select from 'react-select'


const SearchForm: FC = () => {
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

  const options: { [key: string]: string }[] = allCategories.map((category: string) => {
    return { value: category.toLowerCase(), label: category }
  });

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" name="email" />
        <label htmlFor="query">Search</label>
        <input type="text" placeholder="Search" name="query" />
        <label htmlFor="category">Categories</label>
        <Select options={options} name="category" isMulti className='basic-multi-select' classNamePrefix='select' />
      </form>
    </>
  )
};

export default SearchForm;