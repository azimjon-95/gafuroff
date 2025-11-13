import React from "react";
import "./style.css"; // Yuqoridagi CSS faylni import qiling

const HistorySkeleton = () => {
    return (
        <div className="skeleton_history_container">
            {/* Header Skeleton */}
            <div className="skeleton_history_header">
                <div className="skeleton_history_header_content">
                    {/* Title Section */}
                    <div className="skeleton_history_title_section">
                        <div className="skeleton_history_icon"></div>
                        <div className="skeleton_history_title_text">
                            <div className="skeleton_history_title"></div>
                            <div className="skeleton_history_subtitle"></div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="skeleton_history_stats">
                        {/* Stat Card 1 - Total Patients */}
                        <div className="skeleton_history_stat_card">
                            <div className="skeleton_history_stat_icon"></div>
                            <div className="skeleton_history_stat_content">
                                <div className="skeleton_history_stat_number"></div>
                                <div className="skeleton_history_stat_label"></div>
                            </div>
                        </div>

                        {/* Stat Card 2 - Treating */}
                        <div className="skeleton_history_stat_card">
                            <div className="skeleton_history_stat_icon"></div>
                            <div className="skeleton_history_stat_content">
                                <div className="skeleton_history_stat_number"></div>
                                <div className="skeleton_history_stat_label"></div>
                            </div>
                        </div>

                        {/* Stat Card 3 - Debtors */}
                        <div className="skeleton_history_stat_card">
                            <div className="skeleton_history_stat_icon"></div>
                            <div className="skeleton_history_stat_content">
                                <div className="skeleton_history_stat_number"></div>
                                <div className="skeleton_history_stat_label"></div>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="skeleton_history_filter_section">
                            <div className="skeleton_history_date_inputs">
                                <div className="skeleton_history_date_input"></div>
                                <div className="skeleton_history_date_input"></div>
                            </div>
                            <div className="skeleton_history_filter_select"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="skeleton_history_table_wrapper">
                <table className="skeleton_history_table">
                    {/* Table Header */}
                    <thead className="skeleton_history_table_header">
                        <tr>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                            <th className="skeleton_history_header_cell"></th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="skeleton_history_table_body">
                        {[...Array(8)].map((_, index) => (
                            <tr key={index} className="skeleton_history_table_row">
                                {/* Name with Avatar */}
                                <td className="skeleton_history_cell_name">
                                    <div className="skeleton_history_avatar"></div>
                                    <div className="skeleton_history_name_text"></div>
                                </td>
                                {/* ID */}
                                <td className="skeleton_history_cell skeleton_history_cell_id"></td>
                                {/* Phone */}
                                <td className="skeleton_history_cell skeleton_history_cell_phone"></td>
                                {/* Address */}
                                <td className="skeleton_history_cell skeleton_history_cell_address"></td>
                                {/* Age */}
                                <td className="skeleton_history_cell skeleton_history_cell_age"></td>
                                {/* Gender */}
                                <td className="skeleton_history_cell skeleton_history_cell_gender"></td>
                                {/* Amount */}
                                <td className="skeleton_history_cell skeleton_history_cell_amount"></td>
                                {/* Date */}
                                <td className="skeleton_history_cell skeleton_history_cell_date"></td>
                                {/* Count */}
                                <td className="skeleton_history_cell skeleton_history_cell_count"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistorySkeleton;