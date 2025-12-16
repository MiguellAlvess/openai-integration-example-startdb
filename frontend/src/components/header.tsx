const Header = () => {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Assistente Virtual
          </h1>
          <p className="text-sm text-muted-foreground">
            Seu especialista em arquitetura e design de software
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
