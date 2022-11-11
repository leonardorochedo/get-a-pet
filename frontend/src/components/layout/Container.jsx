import './Container.css';

export function Container({ children }) {
    return (
        <main className='container'>
            {children}
        </main>
    );
}