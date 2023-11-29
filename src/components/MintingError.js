export default function MintingError({ errorType }) {

    return (
        <div>

            <div className="h-screen w-screen bg-white flex justify-center align-middle items-center ">
                <h4 className="text-4xl text-amber-950">A ocurrido el siguiente error</h4>
                <p>{errorType}</p>
            </div>

        </div>
    )

}