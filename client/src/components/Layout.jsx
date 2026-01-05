import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} EbUy</div>
      </footer>
    </div>
  );
}
