export default function markUpFooterModal(data) {

  return data
    .map(({ id, image, name_ua, role_en, about_en, link }) => {
      let name, role, about

      return `

    <li class="teammate-list__item" id=${id}>
      <a class="teammate-list__item--link" href=${link} target="_blank">
        <img class="teammate-list__item--image" src=${image} alt="${name}'s photo" width="100"></a>
      <div class="teammate-list__item--description">
        <p class="teammate-list__item--name">${name}</p>
        <p class="teammate-list__item--role">${role}</p>
        <p class="teammate-list__item--about">${about}</p>
      </div>
    </li>
    `;
    })
    .join('');
}
