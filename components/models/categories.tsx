export type Category = {
    tag: string,
    caption: string
    apiTag: string,
    color: string
}

export const categories: Category[] = [
    { tag: "all", caption: "Ақпарат", apiTag: "", color: "#4B68A1" },
    { tag: "literature", caption: "Әдебиет", apiTag: "general", color: "#479CFF" },
    { tag: "art", caption: "Өнер", apiTag: "entertainment", color: "#FF6D6D" },
    { tag: "science", caption: "Ғылым", apiTag: "science", color: "#1EBD71" },
    { tag: "exclusive", caption: "Эксклюзив", apiTag: "tech", color: "#B957D2" },
    { tag: "career", caption: "Карьера", apiTag: "business", color: "#FFB72C" },
    { tag: "sport", caption: "Спорт", apiTag: "sports", color: "#AA2424" },
    { tag: "history", caption: "Тарих", apiTag: "travel", color: "#4B47E2" }];