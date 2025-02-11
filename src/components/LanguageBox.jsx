import '/src/App.css'

export default function LanguageBox(props) {
    function checkBackgroundColor() {
        if (props.color === "blue" || props.color === "purple" || props.color === "green" || props.color === "red" || props.color === "grey") {
            return true
        }
        return false
    }

    return (
        <div className={props.aliveLanguages.includes(props.language) ? null : 'languageBox-wrapper'}>
            <div className={props.classStyle} style={{ 
                backgroundColor: props.color,
                color: checkBackgroundColor() ? "white" : "black"
            }}>{props.language}</div>
            <div className={props.aliveLanguages.includes(props.language) ? null : 'overlay'}>{props.aliveLanguages.includes(props.language) ? null : "🪦"}</div>
        </div>
    )
}

// className={props.classStyle}