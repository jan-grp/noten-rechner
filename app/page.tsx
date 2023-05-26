"use client"

import { ChangeEvent, useState, useEffect } from 'react'
import styles from './page.module.css'
import gradeTable from '../src/grade-table.json'
import Cookie from 'js-cookie'

const defaultFormFields = {
  lk1: -1,
  lk2: -1,
  gk1: -1,
  gk2: -1,
  mdl1: -1,
  mdl2: -1,
  jhr1: -1,
  jhr2: -1
}

export default function Home() {
  const [formState, setFormState] = useState(defaultFormFields)
  const { lk1,lk2,gk1,gk2,mdl1,mdl2,jhr1,jhr2 } = formState
  const [gradePoints, setGradePoints] = useState(0)
  const [grade, setGrade] = useState(0)

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    if(value === "") {
      value = "-1"
    }

    if(value.length > 2) value = value.slice(0,2)

    if(parseInt(value) > 15 || parseInt(value) < -1) {
      value = value[0]
    }
    
    setFormState({ ...formState, [name]: parseInt(value) })
  }

  const calculateGradePoints = (formState: typeof defaultFormFields) => { 
    const { lk1,lk2,gk1,gk2,mdl1,mdl2,jhr1,jhr2 } = formState
    const lk1GradePoint = lk1 === -1 ? 0 : lk1 * 13
    const lk2GradePoint = lk2 === -1 ? 0 : lk2 * 13
    const gk1GradePoint = gk1 === -1 ? 0 : gk1 * 9
    const gk2GradePoint = gk2 === -1 ? 0 : gk2 * 9
    const mdl1GradePoint = mdl1 === -1 ? 0 : mdl1 * 4
    const mdl2GradePoint = mdl2 === -1 ? 0 : mdl2 * 4
    const jhr1GradePoint = jhr1 === -1 ? 0 : jhr1 * 4
    const jhr2GradePoint = jhr2 === -1 ? 0 : jhr2 * 4

    const totalPoints = lk1GradePoint + lk2GradePoint + gk1GradePoint + gk2GradePoint + mdl1GradePoint + mdl2GradePoint + jhr1GradePoint + jhr2GradePoint
    return totalPoints
  }

  const calculateGrade = (gradePoints: number) => { 
    const table = gradeTable.grades
    
    for(let i in table) {
      const minPoints = table[i].min
      if(gradePoints >= minPoints) {
        return table[i].grade
      }
    }
    return 0
  }

  const handleSave = () => {
    for(let i in formState) {
      Cookie.set(i, formState[i])
    }
  }

  useEffect(() => {
    for(let i in defaultFormFields) {
      const storedValue = Cookie.get(i)
      const newState = defaultFormFields
      if(storedValue !== undefined) {
        setFormState({ ...formState, [i]: parseInt(storedValue) })
        newState[i] = parseInt(storedValue)
      
      }
      setFormState(newState)
    }
  }, [])

  useEffect(() => {
    setGradePoints(calculateGradePoints(formState))
  }, [formState])

  useEffect(() => {
    setGrade(calculateGrade(gradePoints))
  }, [gradePoints])

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Abischnitt</h1>
      </div>

      <div className={styles.center}>
        <form
          className={styles.form}
        >
          <label>Kurs</label>
          <label>Note(0-15)</label>
          <label>Leistungskurs 1: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, lk1: -1 })}
            required 
            type="number"
            name="lk1"
            value={lk1 !== -1 ? lk1 : ""}
          />
          <label>Leistungskurs 2: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, lk2: -1 })}
            required 
            type="number"
            name='lk2'
            value={lk2 !== -1 ? lk2 : ""}
          />
          <label>Grundkurs 1: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, gk1: -1 })}
            required 
            type="number"
            name="gk1"
            value={gk1 !== -1 ? gk1 : ""}
          />
          <label>Grundkurs 2: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, gk2: -1 })}
            required 
            type="number"
            name="gk2"
            value={gk2 !== -1 ? gk2 : ""}
          />
          <label>Mündlich 1: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, mdl1: -1 })}
            required 
            type="number"
            name="mdl1"
            value={mdl1 !== -1 ? mdl1 : ""}
          />
          <label>Mündlich 2: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, mdl2: -1 })}
            required 
            type="number"
            name='mdl2'
            value={mdl2 !== -1 ? mdl2 : ""}
          />
          <label>Geschichte: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, jhr1: -1 })}
            required 
            type="number"
            name="jhr1"
            value={jhr1 !== -1 ? jhr1 : ""}
          />
          <label>Kunst/Sport: </label>
          <input
            min="0"
            max="15"
            onChange={handleFormChange}
            onFocus={() => setFormState({ ...formState, jhr2: -1 })}
            required 
            type="number"
            name="jhr2"
            value={jhr2 !== -1 ? jhr2 : ""}
          />
        </form>
      </div>
      <button 
        onClick={handleSave}
        className={styles.saveButton}
      >
        speichern
      </button>
      <span>Punkte: {gradePoints} / 900</span>
      {
        grade !== 0 ? <h1 className={styles.grade}>⌀ {grade}</h1> : <span>nicht bestanden</span>
      }

      
    </main>
  )
}
