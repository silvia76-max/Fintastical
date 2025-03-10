import { mount } from '@cypress/vue'
import ComponenteLogin from '@/components/ComponenteLogin.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'

describe('ComponenteLogin.vue', () => {
  beforeEach(() => {
    mount(ComponenteLogin, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  })

  it('Renderiza correctamente', () => {
    cy.contains('🔑Iniciar Sesión🔑').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button').contains('Entrar').should('exist')
  })

  it('Permite escribir en los inputs', () => {
    cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com')
    cy.get('input[type="password"]').type('password123').should('have.value', 'password123')
  })

  it('Muestra error en credenciales incorrectas', () => {
    const auth = useAuthStore()
    cy.wrap(auth).invoke('login', false) // Simula login fallido

    cy.get('button').click()
    cy.get('.error').should('exist').and('contain', 'Credenciales incorrectas!')
  })

  it('Redirige al dashboard en login exitoso', () => {
    const auth = useAuthStore()
    cy.wrap(auth).invoke('login', true) // Simula login exitoso

    cy.get('button').click()
    cy.url().should('include', '/dashboard')
  })
})
