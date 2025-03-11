export const getTypeLabel = (type) => {
    switch(type) {
        case 'autoUp': return 'Автоподнятие';
        case 'viewing': return 'Просмотр';
        case 'stick': return 'Закрепление';
        case 'replenishing': return 'Пополнение';
        case 'commission': return 'Комиссия';
        default: return type;
    }
};