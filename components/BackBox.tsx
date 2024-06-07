'use client'

const BackBox = ({ onClick } : { onClick: () => any }) => {
  return (
    <div className="back-box" id="back-box" onClick={e => {
      const target = e.target as HTMLElement;
      if (target)
        target.classList.remove('show')
      onClick()
    }}></div>
  )
}

export default BackBox