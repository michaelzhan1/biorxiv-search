'use client'


import { FC, useState } from 'react'
// import Select from 'react-select'


const SearchForm: FC = () => {
  const [articles, setArticles] = useState<any[]>([])

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // fix data types
    const res: Response = await fetch('/api/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data: any = await res.json()
    setArticles(data)
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" name="email" />
        <label htmlFor="query">Search</label>
        <input type="text" placeholder="Search" name="query" />
        <label htmlFor="category">Categories</label>
        {/* <Select options={options} name="category" isMulti className='basic-multi-select' classNamePrefix='select' /> */}
        <button type="submit">Submit</button>
      </form>
      <div>
        <h1>Articles</h1>
        {articles.length}
        { /* fix data types */ }
        { articles.map((article: any, index: number) => {
          return (
            <div key={index}>
              <div>{article.title}</div>
              <div>{article.doi}</div>
            </div>
          )
        })}
      </div>
    </>
  )
};

export default SearchForm;