import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Autocomplete from '../components/autocomplete/Autocomplete'
import styles from '../styles/Home.module.css'
const data = [
  "Açaí",
  "Apple",
  "Akee",
  "Apricot",
  "Avocado",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Black sapote",
  "Blueberry",
  "Boysenberry",
  "Buddha's hand",
  "Crabapples",
  "Currant",
  "Cherry",
  "Cherimoya",
  "Chico fruit",
  "Cloudberry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Damson",
  "Date",
  "Dragonfruit",
  "Pitaya",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Goji berry",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Japanese plum",
  "Jostaberry",
  "Jujube",
  "Juniper berry",
  "Kiwano",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Blood orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Prune",
  "Pineapple",
  "Pineberry",
  "Plumcot",
  "Pomegranate",
  "Pomelo",
  "Purple mangosteen",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salal",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star apple",
  "Star fruit",
  "Strawberry",
  "Surinam cherry",
  "Tamarillo",
  "Tamarind",
  "Ugli fruit",
  "White currant",
  "White sapote",
  "Yuzu",
  "Avocado",
  "Bell pepper",
  "Chili pepper",
  "Corn kernel",
  "Cucumber",
  "Eggplant",
  "Olive",
  "Pea",
  "Pumpkin",
  "Squash",
  "Tomato",
  "Zucchini"
].map((a, index) => ({id: index, value: a}))

const SelectedItemContainer = styled.div`
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;

  > div {
    display: inline;
  }

  div:nth-child(2) {
    margin-left: 5px;
    cursor: pointer;
  }
`
const SelectedItem = ({item, onRemove}) => (
  <SelectedItemContainer>
    <div>{item.value}</div>
    <div onClick={() => onRemove(item)}>{'x'}</div>
  </SelectedItemContainer>
)

export default function Home() {
  const [changedValue, onChangeValue] = useState('Create Next App')
  const [results, setResults] = useState([])
  const [selection, setSelected] = useState([])
  const onChange = (value) => {
    console.log(value)
    onChangeValue(value)
  }

  useEffect(() => {
    const lowercaseValue = changedValue.toLowerCase()
    setResults(data.filter(({value}) => value.toLowerCase().includes(lowercaseValue)))
  }, [changedValue])

  const onSelect = (item) => {
    console.log(item)
    setSelected([...selection, item])
  }

  const onRemoveSelection = (item) => {
    setSelected(selection.filter(({id}) => item.id !== id))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{changedValue}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {changedValue}
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <p>
          {selection.map((item) => <SelectedItem item={item} onRemove={onRemoveSelection}/>)}
        </p>

        <div className={styles.grid}>

          <Autocomplete onSelect={onSelect} resultItems={results} onChange={onChange} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
