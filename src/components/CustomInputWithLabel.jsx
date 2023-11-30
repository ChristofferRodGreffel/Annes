import React from 'react'

function CustomInputWithLabel(props) {

  return (
    <>
      {props.type == "text" && (
        <>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor={props.name}>{props.label}</label>
            <input className='border-2 border-dark' type={props.type} name={props.name} placeholder={props.placeholder} id={props.name} />
          </div>
        </>
      )}

      {props.type == "checkbox" && (
        <>
          <ul className="">
            {props.CustomOptions?.map(({ name }, index) => {
              return (
                <li key={index}>
                  <div className="">
                    <div className="">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={props.CustomCheckedItems[index]}
                        onChange={() => props.CustomHandleChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

    </>
  )
}

export default CustomInputWithLabel