import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { getAnecdotes, newAnecdote ,voteAnecdote } from './request'
import {useNotification} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const {dispatch} =useNotification()
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  
  // newAnecdote mutation
  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'SET_NOTIFICATION', payload: 'A new Anecdote was created'})
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: () => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Error: Anecdote content must be at least 5 characters long.' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  })
  // hander for new note
  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }
  // voteUp mutation
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote voted!' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  })
  // handle
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes + 1})
  }


  if (result.isLoading) {
    return <h2>There is a problem with communication with the server!</h2>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdote app</h2>
      
      <Notification />
      
      {anecdotes.map(anecdote =>
        <div className='mainDiv' key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App
