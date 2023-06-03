export default function Bar({ value }: { value: number | string }) {
    const style = {
        width: `${value}%`,
    }
    return (
        <div className="w-full bg-primary rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-secondary h-2.5 rounded-full" style={style}></div>
        </div>
    )
}
