import React from 'react';
import { Head } from '@inertiajs/react';

export default function PublicLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Head title={title} />
            {children}
        </div>
    );
}
