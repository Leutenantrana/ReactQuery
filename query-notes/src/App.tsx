import { useQuery, useMutation , useQueryClient} from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from './request'

const App = () => {
  // creating query client
  const queryClient = useQueryClient()
  // defining newNoteMutation for creating new note
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess : ()=> queryClient.invalidateQueries({queryKey: ['notes']})
  })
  // updateNote mutation
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    // updating query state by simulating query request
    // onSuccess : ()=> queryClient.invalidateQueries({queryKey: ['notes']})
    // manually updating queryState 
    onSuccess : (newNote)=> {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
    newNoteMutation.mutate({content, important:false})
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important:!note.important})
  }
  const result = useQuery({
    queryKey : ['notes'],
    queryFn : getNotes
  })
  console.log("normal result", result)
  console.log("json parsed result",JSON.parse(JSON.stringify(result)))
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : 'notImp'}</strong>
        </li>
      )}
    </div>
  )
}

export default App