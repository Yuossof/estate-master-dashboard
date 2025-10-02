const TextArea = ({ onChange, placeholder, id, name, rows = 4 , value}) => {
  return (
    <textarea
      onChange={onChange}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      className="px-3 py-2 text-sm border w-full rounded-md mt-2
        bg-white dark:bg-gray-900 
        border-gray-300 dark:border-gray-700 
        shadow-sm hover:border-gray-400 dark:hover:border-gray-600
        c-focus text-gray-900 dark:text-gray-100 resize-none"
    />
  )
}

export default TextArea
