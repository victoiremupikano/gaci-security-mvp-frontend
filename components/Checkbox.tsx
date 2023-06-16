declare type Props = {
    title: string
    name: string
    event: any
    value:boolean
}

export default function Checkbox({title, name, event,value}: Props) {
    return <div className="my-2 text-gray-600 font-semibold text-sm">
        <label htmlFor={name} className='flex  items-center'>
            <input className="caret-blue-600 h-5 w-5 rounded mr-4" onChange={event} type="checkbox" checked={value} name={name} id={name} /> <span>{title}</span>
        </label>
    </div>
}