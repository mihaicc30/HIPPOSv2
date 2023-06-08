import React from 'react'

const Mail = ({user}) => {
  
  const nav = useNavigate();
  useEffect(() => {
    if (!user) return nav("/");
  }, []);
  return (
		<div className="basis-[80%] bg-[--c60] z-10 overflow-y-scroll p-4 flex flex-col">
      
    </div>
  )
}

export default Mail
