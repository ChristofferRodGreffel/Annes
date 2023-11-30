import React from "react";

function CustomInputWithLabel(props) {
  return (
    <>
      {props.type == "text" && (
        <>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg" htmlFor={props.name}>
              {props.label}
            </label>
            <input
              type={props.type}
              name={props.name}
              placeholder={props.placeholder}
              id={props.name}
              value={!props.button ? props.value : undefined}
              onChange={!props.button ? e => props.customSetvalue(e.target.value) : undefined} 
            />

            {props.button && (
              <>
                <button onClick={props.customOnClick}>{props.buttonText}</button>
              </>
            )}
          </div>
        </>
      )}

      {props.type == "checkbox" && (
        <>
          <h2 className="font-semibold text-lg">{props.title}</h2>
          <ul className="">
            {props.CustomOptions?.map(({ name }, index) => {
              return (
                <li key={index}>
                  <div className="">
                    <div className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${name}`}
                        name={name}
                        value={name}
                        checked={props.CustomCheckedItems[index]}
                        onChange={() => props.CustomHandleChange(index, name)}
                      />
                      <label htmlFor={`custom-checkbox-${name}`}>{name}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default CustomInputWithLabel;
