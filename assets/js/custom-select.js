// (function () {
//     // find all custom dropdown wrappers
//     document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
//         const style = dropdown.dataset.style || 'default';
//         const copyHtml = dropdown.dataset.copyHtml === 'true';

//         const button = dropdown.querySelector('.dropdown-button');
//         const menu = dropdown.querySelector('.dropdown-menu');
//         const arrow = dropdown.querySelector('.dropdown-arrow');
//         const selected = dropdown.querySelector('.selected-option');
//         const items = dropdown.querySelectorAll('.dropdown-item');
//         const search = dropdown.querySelector('.dropdown-search');

//         // toggle open/close
//         const toggle = (e) => {
//             e?.stopPropagation();
//             // close other dropdowns
//             document.querySelectorAll('.dropdown-menu').forEach(m => {
//                 if (m !== menu) m.classList.add('hidden');
//             });
//             menu.classList.toggle('hidden');
//             arrow?.classList.toggle('rotate-180');
//         };

//         button?.addEventListener('click', toggle);

//         // prevent dropdown from closing when clicking inside (especially search)
//         menu?.addEventListener('click', (e) => {
//             e.stopPropagation();
//         });

//         // item click handler
//         items.forEach(item => {
//             item.addEventListener('click', (e) => {
//                 e.stopPropagation();

//                 // remove active from siblings
//                 items.forEach(it => {
//                     it.classList.remove('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');
//                     const svg = it.querySelector('.check-svg');
//                     if (svg) svg.classList.add('hidden');
//                 });

//                 // add active to selected
//                 item.classList.add('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');

//                 const checkIcon = item.querySelector('.check-svg');
//                 if (checkIcon) checkIcon.classList.remove('hidden');

//                 const btnText = dropdown.querySelector('.dropdown-button .selected-option');
//                 btnText?.classList?.remove('text-[#8C8484]');
//                 btnText?.classList?.add('text-Theme-Black');

//                 // ✅ Copy both SVG + text to selected area
//                 if (copyHtml) {
//                     const li = item.tagName.toLowerCase() === 'li' ? item : item.closest('li');
//                     if (li) {
//                         const clone = li.cloneNode(true);
//                         // remove check icon if you don’t want it shown in button
//                         const check = clone.querySelector('.check-svg');
//                         if (check) check.remove();
//                         selected.innerHTML = clone.innerHTML;
//                     } else {
//                         const clone = item.cloneNode(true);
//                         const check = clone.querySelector('.check-svg');
//                         if (check) check.remove();
//                         selected.innerHTML = clone.innerHTML;
//                     }
//                 } else {
//                     const clone = item.cloneNode(true);
//                     const check = clone.querySelector('.check-svg');
//                     if (check) check.remove(); // hide check icon in selected view
//                     selected.innerHTML = clone.innerHTML;
//                 }

//                 // close menu
//                 menu.classList.add('hidden');
//                 arrow?.classList.remove('rotate-180');
//             });
//         });

//         // search filtering
//         if (search) {
//             // prevent dropdown from closing when clicking or typing in search
//             search.addEventListener('click', (e) => e.stopPropagation());
//             search.addEventListener('input', () => {
//                 const q = search.value.trim().toLowerCase();
//                 const allItems = dropdown.querySelectorAll('.dropdown-list > li, .dropdown-item');
//                 allItems.forEach(it => {
//                     const text = it.textContent.trim().toLowerCase();
//                     const show = q === '' || text.includes(q);
//                     if (it.tagName.toLowerCase() === 'li') {
//                         it.style.display = show ? '' : 'none';
//                     } else {
//                         it.style.display = show ? 'flex' : 'none';
//                     }
//                 });
//             });
//         }
//     });

//     // close dropdowns when clicking outside
//     window.addEventListener('click', (e) => {
//         document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
//         document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
//     });

//     // close on ESC key
//     window.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
//             document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
//         }
//     });
// })();






//  <!-- design-1  -->

document.querySelectorAll('.custom-dropdown[data-style="design1"]').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const selectedOption = dropdown.querySelector('.selected-option');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    // Toggle dropdown visibility
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.add('hidden');
            arrow.classList.toggle('rotate-180');
        }
    });

    // Select option
    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.textContent.trim();
            selectedOption.textContent = value;
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180');
            button.dispatchEvent(new CustomEvent('optionSelected', { detail: value }));
        });
    });

    // Handle item click (single-select)
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            // Remove active styling from all items
            items.forEach(i => i.classList.remove('active'));

            // Add active styling to selected item
            item.classList.add('active');

            // Update button text
            const text = item.querySelector('span') ? item.querySelector('span').textContent.trim() : item.textContent.trim();
            selectedOption.textContent = text;

            // Close dropdown
            menu.classList.add('hidden');
        });
    });
});


//  <!-- design-2  -->
document.querySelectorAll('[data-style="design2"]').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const selectedOption = dropdown.querySelector('#selectedOption');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const searchInput = dropdown.querySelector('.dropdown-search'); // 👈 search input

    // --- Toggle dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
        if (!menu.classList.contains('hidden') && searchInput) {
            searchInput.focus();
        }
    });

    // --- Filter items on search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // --- Handle item click
    items.forEach(item => {
        item.addEventListener('click', () => {
            // Remove previous highlight
            items.forEach(i => i.classList.remove('!bg-[#F8F6F6]', 'opacity-100'));
            // Highlight selected
            item.classList.add('!bg-[#F8F6F6]', 'opacity-100');

            // Copy HTML content (number + svg + text)
            selectedOption.innerHTML = item.innerHTML;

            // Close menu
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        });
    });

    // --- Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    });
});


//  < !-- ================= DESIGN - 3 ================= -->
document.querySelectorAll('.custom-dropdown[data-style="design3"]').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const selectedContainer = dropdown.querySelector('.selected-option');
    const placeholder = selectedContainer.querySelector('.placeholder');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const searchInput = dropdown.querySelector('.dropdown-search'); // 👈 Search box
    const selectedItems = new Map(); // key = group|label, value = {group, index, label}

    // --- Toggle dropdown open/close
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
        if (!menu.classList.contains('hidden') && searchInput) {
            searchInput.focus();
        }
    });

    // --- Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    });

    // --- Handle search filter
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // --- Handle item selection
    items.forEach(item => {
        const svg = item.querySelector('svg');
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const label = item.dataset.label;
            const group = item.closest('.dropdown-list').dataset.group;
            const index = item.dataset.index;
            const key = `${group}|${label}`;

            const isSelected = selectedItems.has(key);

            if (isSelected) {
                selectedItems.delete(key);
                svg.classList.remove('opacity-100');
                svg.classList.add('opacity-0');
            } else {
                selectedItems.set(key, { group, index, label });
                svg.classList.add('opacity-100');
                svg.classList.remove('opacity-0');
            }

            renderSelected();
        });
    });

    // --- Render selected chips
    function renderSelected() {
        selectedContainer.innerHTML = '';
        const selectedArray = Array.from(selectedItems.values());
        const totalSelected = selectedArray.length;

        if (totalSelected === 0) {
            placeholder.style.display = 'block';
            selectedContainer.appendChild(placeholder);
            return;
        }

        placeholder.style.display = 'none';

        const visibleCount = 6;
        const visibleItems = selectedArray.slice(0, visibleCount);
        const remainingCount = totalSelected - visibleCount;

        visibleItems.forEach((data) => {
            const chip = document.createElement('div');
            chip.className = 'chip flex items-center gap-2.5 bg-white rounded-[30px] p-[3px] pr-2.5';
            chip.innerHTML = `
        <span class="w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#007D47] text-white text-xs font-semibold">${data.index}</span>
        <span class="text-[#007D47] text-[16px] font-medium">${data.label}</span>
        <button class="remove-chip text-[#000A06] text-xl leading-[100%]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1415_2279)">
                    <path d="M1 9L9 1" stroke="#000A06" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 9L1 1" stroke="#000A06" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs><clipPath id="clip0_1415_2279"><rect width="10" height="10" fill="white" /></clipPath></defs>
            </svg>
        </button>
        `;

            chip.querySelector('.remove-chip').addEventListener('click', (ev) => {
                ev.stopPropagation();
                const key = `${data.group}|${data.label}`;
                selectedItems.delete(key);

                const item = dropdown.querySelector(`.dropdown-list[data-group="${data.group}"] .dropdown-item[data-label="${data.label}"]`);
                if (item) {
                    const svg = item.querySelector('svg');
                    if (svg) {
                        svg.classList.remove('opacity-100');
                        svg.classList.add('opacity-0');
                    }
                }

                renderSelected();
            });

            selectedContainer.appendChild(chip);
        });

        if (remainingCount > 0) {
            const moreChip = document.createElement('div');
            moreChip.className = 'chip flex items-center justify-center bg-[#F8F6F6] rounded-[20px] border border-[#E2DCDC] px-2 py-1 text-[#8C8484] text-[14px] font-medium';
            moreChip.textContent = `+${remainingCount}`;
            selectedContainer.appendChild(moreChip);
        }
    }
});

//  < !-- ================= DESIGN - 4 ================= -->
document.querySelectorAll('.custom-dropdown[data-style="design4"]').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button')
    const menu = dropdown.querySelector('.dropdown-menu')
    const arrow = dropdown.querySelector('.dropdown-arrow')
    const selectedContainer = dropdown.querySelector('.selected-option')
    const placeholder = selectedContainer.querySelector('.placeholder')
    const items = dropdown.querySelectorAll('.dropdown-item')

    const selectedValues = new Set()

    // Toggle
    button.addEventListener('click', e => {
        e.stopPropagation()
        menu.classList.toggle('hidden')
        arrow.classList.toggle('rotate-180')
    })

    // Outside click
    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) {
            menu.classList.add('hidden')
            arrow.classList.remove('rotate-180')
        }
    })

    // Select
    items.forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation()
            const value = item.textContent.trim()

            if (selectedValues.has(value)) return

            selectedValues.add(value)
            renderChips()
        })
    })

    function renderChips() {
        selectedContainer.innerHTML = ''
        placeholder.style.display = 'none'

        selectedValues.forEach(value => {
            const chip = document.createElement('div')
            chip.className =
                'flex items-center gap-2 bg-white border border-[#E2DCDC] rounded-[6px] px-1.5 py-[3px] text-xs text-[#000A06]'
            chip.innerHTML = `
                <span>${value}</span>
                <button class="remove-chip text-[#8C8484] hover:text-black">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8L8 2" stroke="#000A06" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 8L2 2" stroke="#000A06" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `

            chip.querySelector('.remove-chip').addEventListener('click', e => {
                e.stopPropagation()
                selectedValues.delete(value)
                renderChips()
            })

            selectedContainer.appendChild(chip)
        })

        if (selectedValues.size === 0) {
            selectedContainer.appendChild(placeholder)
            placeholder.style.display = 'block'
        }
    }
})