export default function StatsSection({ title, children }) {
    return (
        <div className="statsWrapper">
            <h1 className="statsTitle">{title}</h1>
            {children}
        </div>
    );
}
