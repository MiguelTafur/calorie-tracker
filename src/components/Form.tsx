import { useState, type ChangeEvent, type FormEvent, type Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type formProps = {
        dispatch: Dispatch<ActivityActions>,
        state: ActivityState
    }

export default function Form({dispatch, state}: formProps) {

    const initialState : Activity = {
        id: uuidv4(),
        category: 1, 
        name: '',
        calories: 0
    }

    const [activity, setAcivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const seletedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setAcivity(seletedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setAcivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({type: "save-activity", payLoad: {newActivity: activity}})

        setAcivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" value={activity.category} onChange={handleChange}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input type="text" id="name" className="border border-slate-300 p-2 rounded-lg" value={activity.name} onChange={handleChange} placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Pesas, Bicicleta"/>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input type="number" id="calories" className="border border-slate-300 p-2 rounded-lg" value={activity.calories} onChange={handleChange} placeholder="Calorias. ej. 300 o 500"/>
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed" value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()}/>
    </form>
  )
}
