import { Modal } from 'ui-components/modal/Modal';
import React, { useState } from 'react'

export const Test = () => {
  const [show, setShow] = useState(false);
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta dui velit, bibendum elementum enim semper ut. Morbi nec pretium ante. Nunc eu tellus imperdiet, porttitor neque et, commodo felis. Suspendisse magna leo, lobortis ornare sollicitudin eu, accumsan ultricies tortor. Aenean turpis tortor, viverra ut vulputate et, vehicula sit amet lectus. In hac habitasse platea dictumst. Duis elementum nibh dolor, id venenatis est commodo id. Quisque scelerisque arcu ac velit rhoncus, nec maximus elit interdum. In dictum neque in urna sollicitudin, ac porttitor lectus tempor. Duis quis sapien ac mauris pellentesque luctus. Sed eu risus sed velit ultrices congue quis non eros. Duis non tincidunt neque, in scelerisque purus. Nunc tempor fringilla nisl, sit amet venenatis ipsum dictum non. Nullam et ante sit amet tortor euismod fermentum. Nullam sit amet ultrices lacus. Mauris mattis placerat urna eu lacinia.

  Nam vel dolor quis lacus pretium aliquam. Nullam nec dolor in purus dictum pharetra eu nec nisi. Donec in mattis sem, eu fringilla sem. Nulla in nisl orci. Integer sagittis feugiat laoreet. Maecenas eu bibendum nulla. Maecenas nulla dolor, suscipit ut dolor nec, volutpat luctus ligula. Maecenas nec dui ultrices, dapibus erat at, varius tortor. Vivamus lacinia ultricies sem, at tempor nibh eleifend in. Cras et orci at lacus feugiat fringilla ac at arcu. Ut tincidunt porta convallis. Duis tincidunt laoreet odio vitae ullamcorper. Sed at varius orci. Donec at urna mi. Nam euismod pulvinar imperdiet.

  Donec ante felis, tristique non lacinia in, auctor et lorem. Duis laoreet vehicula egestas. Aenean at tortor quis risus ultrices aliquet nec vel diam. Nulla lectus purus, euismod et convallis ut, finibus et est. Curabitur id ante nec nisi feugiat sagittis. Donec nec nunc quis felis faucibus laoreet. Aenean quis est non odio dignissim pharetra egestas dignissim sapien. Etiam vestibulum nibh lobortis felis placerat, a rutrum dui finibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi a volutpat velit. Duis convallis semper est. Curabitur lobortis ipsum leo, at fermentum sem malesuada a. Phasellus in laoreet nibh. Integer venenatis mauris nisi, efficitur congue dui dignissim a. Donec faucibus lectus sit amet enim tincidunt, id iaculis metus congue. Nulla facilisi.

  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse mollis, lacus eget interdum convallis, velit nisi congue sem, ut imperdiet arcu sapien tempor risus. In urna nulla, viverra sed suscipit at, sodales nec leo. Nunc condimentum justo at nisl eleifend consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam augue velit, rhoncus vel nisi at, facilisis ultrices mauris. Phasellus volutpat pharetra mollis. Suspendisse euismod, ante sed elementum rutrum, purus dolor consequat augue, laoreet feugiat tellus lorem et sapien. Phasellus a aliquam dolor, at tempus turpis. Quisque non tincidunt turpis, vel iaculis ipsum. Integer in ante nisl. Morbi non justo diam. Integer vel odio neque. Proin ultricies leo ligula, eu luctus ex auctor luctus. Praesent et lorem ut enim iaculis molestie.

  Vestibulum pellentesque justo ligula, sit amet condimentum sapien malesuada in. Aliquam nulla ante, laoreet sit amet purus sed, elementum sollicitudin tellus. Duis porta ligula nulla, a aliquam leo eleifend a. Pellentesque sit amet risus at eros dignissim efficitur ut sed est. Aenean congue, eros vel interdum euismod, enim dolor vulputate sem, id scelerisque nunc dui at eros. Phasellus vehicula turpis vitae dui eleifend vulputate. Duis sodales id sapien ac cursus. Sed auctor blandit dui eget tincidunt. Pellentesque ut scelerisque est. Proin eu enim maximus, imperdiet lacus quis, placerat velit. Phasellus eu suscipit nisl. Praesent lacinia bibendum elementum. Vivamus iaculis nisl non magna bibendum, ullamcorper malesuada eros aliquet. Nullam vehicula a ligula vitae egestas.`
  return (
    <div>
      <button onClick={() => setShow(!show)}>
      Test
      </button>
      <p>{lorem}</p>
      <Modal open={show} setOpen={setShow} onClose={() => {console.log("Closing");setShow(false)}} title={"Title"}><p>{lorem}</p></Modal>
    </div>

  )
}
