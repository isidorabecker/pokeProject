import React from 'react'

const HomePage: React.FC = () => {
  return (
    <section className="h-[500px] flex justify-center px-10">
      <article className="mx-4 mb-4 flex flex-row justify-center">
        <div className="justify-center items-center flex-col h-full w-full">
          <h1> PokeWeb </h1>
          <button onClick={() => console.log('CLICKED')}> START</button>
        </div>
      </article>
    </section>
  )
}

export default HomePage
