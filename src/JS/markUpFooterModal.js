export default function markUpFooterModal(data) {

  return data
    .map(({ id, image, name_ua, role_en, about_en}) => {
      let name_ua, role_en, about_en

      return `

    <li class="teammate-list__item" id=${id}>
        <img class="teammate-list__item--image" src=${image} alt="${name_ua}'s photo" width="100"></a>
      <div class="teammate-list__item--description">
        <p class="teammate-list__item--name">${name_ua}</p>
        <p class="teammate-list__item--role">${role_en}</p>
        <p class="teammate-list__item--about">${about_en}</p>
      </div>
    </li>
    `;
    })
    .join('');
}
