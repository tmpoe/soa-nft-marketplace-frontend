export function NftViewActionButton({
    text,
    onClick,
    onClickArg,
}: {
    text: string
    onClick: Function
    onClickArg: any
}) {
    return (
        <button
            className="row-start-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-2 border-blue-700 hover:border-blue-500 rounded"
            onClick={() => onClick(onClickArg)}
        >
            {text}
        </button>
    )
}
