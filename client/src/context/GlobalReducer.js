export default (state, action) => {
  switch(action.type) {
    case 'SET_AUTH':
      return {
          ...state,
          loading: true,
          authenticated: action.payload
      }
    case 'SET_DASHBOARD':
      return {
          ...state,
          loading: true,
          user: {
            ...state.user,
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name
          }
      }
    case 'SET_ERROR':
      return {
          ...state,
          error: action.payload.status,
          message: action.payload.message
      }
    case 'SET_LOADING':
      return {
          ...state,
          loading: action.payload
      }
    default:
      return state
  }
}