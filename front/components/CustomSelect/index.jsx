import React, { useEffect, useState, useRef } from 'react';

export default ({
  isRef = false,
  values = [],
  onChange,
  value,
  clear = false,
  search = false,
  required,
  label,
  info
}) => {
  const Select = useRef()
  const [Value, changeValue] = useState({ name: value.name, value: value.value });
  const [SearchValue, changeSearchValue] = useState('');
  const [Visible, changeVisible] = useState(false);

  const setValue = (value) => {
    changeVisible(false)
    changeValue(value)
  }

  useEffect(() => {

    window.addEventListener('click', e => {
      if (Select.current && !Select.current.contains(e.target))
        changeVisible(false)
    })

    return () => {
      window.removeEventListener('click', e => {
        if (Select.current && !Select.current.contains(e.target))
          changeVisible(false)
      })
    }

  }, [])

  useEffect(() => {

    if (values.length > 0 && value.value != Value.value)
      changeValue(values[0])

  }, [values])

  useEffect(() => {

    if ((value.value != Value.value && !isRef) || isRef)
      onChange(Value.value)

  }, [Value])

  return (
    <div ref={Select} className={'own-custom-select'}>
      <div className={'own-custom-select-input'}>
        <div className="custom-input-03">
          <label className={info ? 'info-text' : ''}>{label}</label>
          <div className="enter">
            <input className={info ? 'standart-text' : ''} type="text" readOnly value={Value.name} required={required} onClick={e => { e.preventDefault(); changeVisible(!Visible) }} />
            <a className={Visible ? 'button up' : 'button'} onClick={() => changeVisible(!Visible)}></a>
          </div>
        </div>
      </div>
      <div className={Visible ? 'own-custom-select-list' : 'own-custom-select-list none'}>
        <ul>
          {
            search
              ? <li>
                <input value={SearchValue} type="text" className="custom-input-00" onChange={e => changeSearchValue(e.target.value)} />
              </li>
              : null
          }
          {
            clear
              ? <li>
                <a className={info ? 'info-text w-100 d-inline-block text-center' : 'standart-text w-100 d-inline-block text-center'} onClick={() => setValue({ name: '', value: '' })}>
                  clear
                </a>
              </li>
              : null
          }
          {
            values.map((v, i) => SearchValue
              ? (v.value.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1 || v.name.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1)
                ? (
                  <li key={i}>
                    <a className={info ? 'standart-text w-100 d-inline-block' : 'w-100 d-inline-block'} onClick={() => setValue(v)}>
                      {v.name}
                    </a>
                  </li>
                )
                : null
              : (
                <li key={i}>
                  <a className={info ? 'standart-text w-100 d-inline-block' : 'w-100 d-inline-block'} onClick={() => setValue(v)}>
                    {v.name}
                  </a>
                </li>
              ))
          }
        </ul>
      </div>
    </div >
  )

}